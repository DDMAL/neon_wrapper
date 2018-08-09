import rodan
__version__ = "0.0.5"

import logging
logger = logging.getLogger('rodan')

from rodan.jobs import module_loader

module_loader('rodan.jobs.neon2-wrapper.wrapper')
