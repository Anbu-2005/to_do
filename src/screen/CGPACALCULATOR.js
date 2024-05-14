import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const CGPACalculator = ({ navigation }) => { // Added the name CGPACalculator
  const [courseData, setCourseData] = useState([
    { gradePoint: "", credits: "" },
  ]);
  const [cgpa, setCGPA] = useState(null);

  const addCourse = () => {
    setCourseData([...courseData, { gradePoint: "", credits: "" }]);
  };

  const updateGradePoint = (index, value) => {
    const newData = [...courseData];
    newData[index].gradePoint = value;
    setCourseData(newData);
  };

  const updateCredits = (index, value) => {
    const newData = [...courseData];
    newData[index].credits = value;
    setCourseData(newData);
  };

  const calculateCGPA = () => {
    let totalCreditPoints = 0;
    let totalCredits = 0;

    courseData.forEach((course) => {
      const gradePoint = parseFloat(course.gradePoint);
      const credits = parseFloat(course.credits);

      if (!isNaN(gradePoint) && !isNaN(credits)) {
        totalCreditPoints += gradePoint * credits;
        totalCredits += credits;
      }
    });

    const calculatedCGPA =
      totalCredits === 0 ? 0 : totalCreditPoints / totalCredits;
    setCGPA(calculatedCGPA.toFixed(2));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        CGPA Calculator
      </Text>

      <FlatList
        data={courseData}
        renderItem={({ item, index }) => (
          <View style={{ marginBottom: 10 }}>
            <TextInput
              placeholder={`Grade Point for Course ${index + 1}`}
              keyboardType="numeric"
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 5,
              }}
              onChangeText={(value) => updateGradePoint(index, value)}
            />
            <TextInput
              placeholder={`Credits for Course ${index + 1}`}
              keyboardType="numeric"
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 10,
              }}
              onChangeText={(value) => updateCredits(index, value)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Add Course" onPress={addCourse} />
      <Button title="Calculate CGPA" onPress={calculateCGPA} />

      {cgpa !== null && (
        <Text style={{ marginTop: 20 }}>Your CGPA: {cgpa}</Text>
      )}
    </View>
  );
};
export default CGPACalculator; // Changed the component name here as well
