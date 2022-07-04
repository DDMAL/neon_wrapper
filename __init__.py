__version__ = "1.0.0"
from rodan.jobs import module_loader

try:
    import wrapper
except ImportError:
    from . import wrapper

#try-catch clause for rodan-main and py3-celery python version mismatch :)