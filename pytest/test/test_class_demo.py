class TestClassDemoInstance:
    value = 0

    def test_one(self):
        self.value = 1
        assert self.value == 1

    def test_two(self):
        assert self.value == 1
    
    def test_three(self):
        assert TestClassDemoInstance.value == 1

    def test_influencer(self):
        TestClassDemoInstance.value = 1
        assert TestClassDemoInstance.value == 1

    def test_fan(self):
        assert TestClassDemoInstance.value == 1