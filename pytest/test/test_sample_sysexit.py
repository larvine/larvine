import sys
import pytest
sys.path.append("/home/ylarvine/dev_larvine/pytest")

from src.sample_sysexit import f

def test_mytest():
    with pytest.raises(SystemExit):
        f()