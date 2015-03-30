from .base import *
import dj_database_url


DATABASES = {
    'default': dj_database_url.config()
}
