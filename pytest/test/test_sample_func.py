import sys
sys.path.append("/home/ylarvine/dev_larvine/pytest")

from src.sample_func import func

def test_answer():
    assert func(3) == 5