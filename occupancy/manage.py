#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "occupancy.settings")

    from django.core.management import execute_from_command_line
    from django.core.management import call_command


    # execute_from_command_line(sys.argv)
    # call_command('get_token')
