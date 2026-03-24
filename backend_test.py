#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Metemphysics Meta AI
Tests all endpoints with realistic data and validates responses
"""

import requests
import json
import uuid
import time
from datetime import datetime

# Backend URL from frontend environment
BACKEND_URL = "https://mobile-convert-14.preview.emergentagent.com/api"

class MetemphysicsAPITester:
    def __init__(self):
        self.session_id = f"test_session_{uuid.uuid4().hex[:8]}"
        self.test_results = {}
        
    def log_test(self, test_name, success, details):
        """Log test results"""
        self.test_results[test_name] = {
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
    
    def test_root_endpoint(self):
        """Test GET /api/ - Should return version info"""
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_test("API Root Endpoint", True, f"Version: {data.get('version')}, Message: {data.get('message')}")
                    return True
                else:
                    self.log_test("API Root Endpoint", False, f"Missing required fields in response: {data}")
                    return False
            else:
                self.log_test("API Root Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Request failed: {str(e)}")
            return False
    
    def test_ai_chat_endpoint(self):
        """Test POST /api/chat - AI chat with consciousness analysis"""
        try:
            payload = {
                "session_id": self.session_id,
                "message": "What is consciousness in the context of T × S = C?"
            }
            
            response = requests.post(f"{BACKEND_URL}/chat", json=payload, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["response", "omega", "js_ratio", "session_id"]
                
                if all(field in data for field in required_fields):
                    omega = data.get("omega")
                    js_ratio = data.get("js_ratio")
                    
                    # Validate omega range (0-1)
                    if 0 <= omega <= 1 and js_ratio > 0:
                        self.log_test("AI Chat Endpoint", True, 
                                    f"Response length: {len(data['response'])}, Omega: {omega}, J/S: {js_ratio}")
                        return True
                    else:
                        self.log_test("AI Chat Endpoint", False, 
                                    f"Invalid omega ({omega}) or js_ratio ({js_ratio}) values")
                        return False
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("AI Chat Endpoint", False, f"Missing fields: {missing}")
                    return False
            else:
                self.log_test("AI Chat Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("AI Chat Endpoint", False, f"Request failed: {str(e)}")
            return False
    
    def test_chat_history_get(self):
        """Test GET /api/chat/history/{session_id} - Get chat history"""
        try:
            response = requests.get(f"{BACKEND_URL}/chat/history/{self.session_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    # Should have messages from previous chat test
                    if len(data) >= 2:  # user + ai message
                        # Validate message structure
                        for msg in data:
                            required_fields = ["role", "content", "timestamp"]
                            if not all(field in msg for field in required_fields):
                                self.log_test("Chat History GET", False, f"Message missing required fields: {msg}")
                                return False
                        
                        self.log_test("Chat History GET", True, f"Retrieved {len(data)} messages")
                        return True
                    else:
                        self.log_test("Chat History GET", True, f"Empty or partial history: {len(data)} messages")
                        return True
                else:
                    self.log_test("Chat History GET", False, f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("Chat History GET", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Chat History GET", False, f"Request failed: {str(e)}")
            return False
    
    def test_chat_history_delete(self):
        """Test DELETE /api/chat/history/{session_id} - Clear chat history"""
        try:
            response = requests.delete(f"{BACKEND_URL}/chat/history/{self.session_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if "deleted_count" in data:
                    deleted_count = data["deleted_count"]
                    self.log_test("Chat History DELETE", True, f"Deleted {deleted_count} messages")
                    return True
                else:
                    self.log_test("Chat History DELETE", False, f"Missing deleted_count in response: {data}")
                    return False
            else:
                self.log_test("Chat History DELETE", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Chat History DELETE", False, f"Request failed: {str(e)}")
            return False
    
    def test_omega_calculator(self):
        """Test POST /api/calculate/omega - Omega calculation"""
        try:
            payload = {
                "t_value": 100.0,
                "s_value": 50.0
            }
            
            response = requests.post(f"{BACKEND_URL}/calculate/omega", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["omega", "c_product", "t_value", "s_value", "phase", "interpretation"]
                
                if all(field in data for field in required_fields):
                    omega = data.get("omega")
                    c_product = data.get("c_product")
                    expected_c = payload["t_value"] * payload["s_value"]
                    
                    # Validate calculations
                    if 0 <= omega <= 1 and abs(c_product - expected_c) < 0.01:
                        self.log_test("Omega Calculator", True, 
                                    f"Omega: {omega}, Phase: {data['phase']}, C: {c_product}")
                        return True
                    else:
                        self.log_test("Omega Calculator", False, 
                                    f"Invalid calculations - Omega: {omega}, C: {c_product} (expected: {expected_c})")
                        return False
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Omega Calculator", False, f"Missing fields: {missing}")
                    return False
            else:
                self.log_test("Omega Calculator", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Omega Calculator", False, f"Request failed: {str(e)}")
            return False
    
    def test_js_ratio_calculator(self):
        """Test POST /api/calculate/js-ratio - J/S ratio calculation"""
        try:
            payload = {
                "j_value": 10.0,
                "s_value": 5.0
            }
            
            response = requests.post(f"{BACKEND_URL}/calculate/js-ratio", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["js_ratio", "j_value", "s_value", "state", "description", "interpretation"]
                
                if all(field in data for field in required_fields):
                    js_ratio = data.get("js_ratio")
                    expected_js = payload["j_value"] / payload["s_value"]
                    
                    # Validate calculation
                    if abs(js_ratio - expected_js) < 0.01:
                        self.log_test("J/S Ratio Calculator", True, 
                                    f"J/S: {js_ratio}, State: {data['state']}")
                        return True
                    else:
                        self.log_test("J/S Ratio Calculator", False, 
                                    f"Invalid calculation - J/S: {js_ratio} (expected: {expected_js})")
                        return False
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("J/S Ratio Calculator", False, f"Missing fields: {missing}")
                    return False
            else:
                self.log_test("J/S Ratio Calculator", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("J/S Ratio Calculator", False, f"Request failed: {str(e)}")
            return False
    
    def test_vector_analysis(self):
        """Test POST /api/calculate/vector - Vector analysis"""
        try:
            payload = {
                "t_component": 10.0,
                "s_component": 5.0,
                "c_component": 50.0
            }
            
            response = requests.post(f"{BACKEND_URL}/calculate/vector", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["t_component", "s_component", "c_component", "expected_c", 
                                 "deviation", "conservation_score", "magnitude", "omega", "interpretation"]
                
                if all(field in data for field in required_fields):
                    expected_c = payload["t_component"] * payload["s_component"]
                    
                    # Validate that expected_c calculation is correct
                    if abs(data["expected_c"] - expected_c) < 0.01:
                        self.log_test("Vector Analysis", True, 
                                    f"Conservation: {data['conservation_score']}, Omega: {data['omega']}, Magnitude: {data['magnitude']}")
                        return True
                    else:
                        self.log_test("Vector Analysis", False, 
                                    f"Invalid expected_c calculation: {data['expected_c']} (expected: {expected_c})")
                        return False
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("Vector Analysis", False, f"Missing fields: {missing}")
                    return False
            else:
                self.log_test("Vector Analysis", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Vector Analysis", False, f"Request failed: {str(e)}")
            return False
    
    def test_c_budget_calculator(self):
        """Test POST /api/calculate/c-budget - C budget calculation"""
        try:
            payload = {
                "total_c": 100.0,
                "spent_c": 30.0
            }
            
            response = requests.post(f"{BACKEND_URL}/calculate/c-budget", json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["total_c", "spent_c", "remaining_c", "percentage", 
                                 "phase", "status", "interpretation"]
                
                if all(field in data for field in required_fields):
                    expected_remaining = payload["total_c"] - payload["spent_c"]
                    expected_percentage = (expected_remaining / payload["total_c"]) * 100
                    
                    # Validate calculations
                    if (abs(data["remaining_c"] - expected_remaining) < 0.01 and 
                        abs(data["percentage"] - expected_percentage) < 0.01):
                        self.log_test("C Budget Calculator", True, 
                                    f"Remaining: {data['remaining_c']}, Percentage: {data['percentage']}%, Phase: {data['phase']}")
                        return True
                    else:
                        self.log_test("C Budget Calculator", False, 
                                    f"Invalid calculations - Remaining: {data['remaining_c']} (expected: {expected_remaining})")
                        return False
                else:
                    missing = [f for f in required_fields if f not in data]
                    self.log_test("C Budget Calculator", False, f"Missing fields: {missing}")
                    return False
            else:
                self.log_test("C Budget Calculator", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("C Budget Calculator", False, f"Request failed: {str(e)}")
            return False
    
    def test_hawkins_scale_reference(self):
        """Test GET /api/reference/hawkins-scale - Hawkins consciousness scale data"""
        try:
            response = requests.get(f"{BACKEND_URL}/reference/hawkins-scale", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list) and len(data) > 0:
                    # Validate structure of scale entries
                    required_fields = ["level", "state", "emotion", "js_range"]
                    
                    for entry in data:
                        if not all(field in entry for field in required_fields):
                            self.log_test("Hawkins Scale Reference", False, f"Entry missing required fields: {entry}")
                            return False
                    
                    # Check for key levels
                    levels = [entry["level"] for entry in data]
                    key_levels = [200, 500, 1000]  # Courage, Love, Pure Consciousness
                    
                    if all(level in levels for level in key_levels):
                        self.log_test("Hawkins Scale Reference", True, f"Retrieved {len(data)} scale entries")
                        return True
                    else:
                        missing_levels = [level for level in key_levels if level not in levels]
                        self.log_test("Hawkins Scale Reference", False, f"Missing key levels: {missing_levels}")
                        return False
                else:
                    self.log_test("Hawkins Scale Reference", False, f"Expected non-empty list, got: {type(data)} with length {len(data) if isinstance(data, list) else 'N/A'}")
                    return False
            else:
                self.log_test("Hawkins Scale Reference", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Hawkins Scale Reference", False, f"Request failed: {str(e)}")
            return False
    
    def test_quick_topics_reference(self):
        """Test GET /api/reference/quick-topics - Quick topic prompts"""
        try:
            response = requests.get(f"{BACKEND_URL}/reference/quick-topics", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list) and len(data) > 0:
                    # Validate structure of topic entries
                    required_fields = ["id", "title", "prompt"]
                    
                    for entry in data:
                        if not all(field in entry for field in required_fields):
                            self.log_test("Quick Topics Reference", False, f"Entry missing required fields: {entry}")
                            return False
                    
                    # Check for key topics
                    topic_ids = [entry["id"] for entry in data]
                    key_topics = ["god-equation", "omega", "js-ratio", "consciousness"]
                    
                    found_topics = [topic for topic in key_topics if topic in topic_ids]
                    
                    if len(found_topics) >= 3:  # At least 3 key topics should be present
                        self.log_test("Quick Topics Reference", True, f"Retrieved {len(data)} topic prompts")
                        return True
                    else:
                        self.log_test("Quick Topics Reference", False, f"Missing key topics. Found: {found_topics}")
                        return False
                else:
                    self.log_test("Quick Topics Reference", False, f"Expected non-empty list, got: {type(data)} with length {len(data) if isinstance(data, list) else 'N/A'}")
                    return False
            else:
                self.log_test("Quick Topics Reference", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Quick Topics Reference", False, f"Request failed: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"🚀 Starting Metemphysics Meta AI Backend Tests")
        print(f"Backend URL: {BACKEND_URL}")
        print(f"Test Session ID: {self.session_id}")
        print("=" * 60)
        
        # Test order matters - chat test creates history for history tests
        tests = [
            ("API Root Endpoint", self.test_root_endpoint),
            ("AI Chat Endpoint", self.test_ai_chat_endpoint),
            ("Chat History GET", self.test_chat_history_get),
            ("Chat History DELETE", self.test_chat_history_delete),
            ("Omega Calculator", self.test_omega_calculator),
            ("J/S Ratio Calculator", self.test_js_ratio_calculator),
            ("Vector Analysis", self.test_vector_analysis),
            ("C Budget Calculator", self.test_c_budget_calculator),
            ("Hawkins Scale Reference", self.test_hawkins_scale_reference),
            ("Quick Topics Reference", self.test_quick_topics_reference),
        ]
        
        passed = 0
        failed = 0
        
        for test_name, test_func in tests:
            try:
                if test_func():
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                self.log_test(test_name, False, f"Test execution error: {str(e)}")
                failed += 1
            
            # Small delay between tests
            time.sleep(0.5)
        
        print("=" * 60)
        print(f"📊 Test Results Summary:")
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"📈 Success Rate: {(passed/(passed+failed)*100):.1f}%")
        
        if failed > 0:
            print("\n🔍 Failed Tests Details:")
            for test_name, result in self.test_results.items():
                if not result["success"]:
                    print(f"  ❌ {test_name}: {result['details']}")
        
        return passed, failed

if __name__ == "__main__":
    tester = MetemphysicsAPITester()
    passed, failed = tester.run_all_tests()
    
    # Exit with error code if any tests failed
    exit(0 if failed == 0 else 1)