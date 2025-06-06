import sys
from pathlib import Path
from loguru import logger


def setup_logger(
    name: str = "",
    log_dir: Path = Path("logs"),
    console_level: str = "INFO",
    file_level: str = "DEBUG",
) -> logger.__class__:
    """
    Initialize a preconfigured Loguru logger instance.
    
    Args:
        name (str): Optional name to bind to logger.
        log_dir (Path): Directory for log files.
        console_level (str): Log level for console output.
        file_level (str): Log level for all log files.

    Returns:
        loguru.logger.__class__: A bound, multi-sink Loguru logger.
    """
    log_dir.mkdir(parents=True, exist_ok=True)
    instance = logger.bind(name=name)
    instance.remove()

    # Console output
    instance.add(
        sys.stderr,
        colorize=True,
        format="<green>{time:HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan> - <level>{message}</level>",
        level=console_level,
        filter=lambda record: record["level"].no >= logger.level(console_level).no,
    )

    # Main application log
    instance.add(
        log_dir / f"{name}_main.log" if name else log_dir / "main.log",
        rotation="100 MB",
        retention="7 days",
        compression="zip",
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}",
        level=file_level,
        enqueue=True,
        backtrace=True,
        diagnose=True,
    )

    # Dedicated logs for special categories
    category_logs = {
        "performance": "performance.log",
        "model": "model.log",
        "errors": "errors.log",
    }

    for tag, filename in category_logs.items():
        instance.add(
            log_dir / filename,
            rotation="50 MB" if tag != "model" else "100 MB",
            retention="30 days" if tag == "errors" else "7 days",
            compression="zip",
            format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {message}" if tag != "errors" else "{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function}:{line} - {message}\n{exception}",
            filter=(lambda r, t=tag: t in r["extra"]),
            level="DEBUG" if tag != "errors" else "ERROR",
            enqueue=True,
            backtrace=True if tag == "errors" else False,
            diagnose=True if tag == "errors" else False,
        )

    return instance

