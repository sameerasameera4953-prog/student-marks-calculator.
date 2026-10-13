const form = document.getElementById("marksForm");
const result = document.getElementById("result");
const errorMessage = document.getElementById("errorMessage");

const subjectIds = ["maths", "physics", "chemistry", "english", "computers"];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  errorMessage.textContent = "";

  const marks = [];
  for (const id of subjectIds) {
    const input = document.getElementById(id);
    const value = input.value.trim();

    if (value === "" || !Number.isFinite(Number(value))) {
      errorMessage.textContent = "Please enter marks for every subject.";
      result.classList.add("hidden");
      input.focus();
      return;
    }

    const mark = Number(value);
    if (!Number.isInteger(mark) || mark < 0 || mark > 100) {
      errorMessage.textContent = "Marks must be whole numbers from 0 to 100.";
      result.classList.add("hidden");
      input.focus();
      return;
    }
    marks.push(mark);
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = total / marks.length;
  const passed = marks.every(mark => mark >= 35);

  let grade;
  if (!passed) grade = "F";
  else if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 50) grade = "D";
  else grade = "E";

  const studentName = document.getElementById("studentName").value.trim();
  document.getElementById("resultName").textContent =
    studentName ? `Student: ${studentName}` : "Student result";
  document.getElementById("total").textContent = `${total} / 500`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("grade").textContent = grade;
  document.getElementById("status").textContent = passed ? "PASS" : "FAIL";
  document.getElementById("status").style.color = passed ? "#067647" : "#b42318";

  result.classList.remove("hidden");
});

form.addEventListener("reset", function () {
  errorMessage.textContent = "";
  result.classList.add("hidden");
  document.getElementById("status").style.color = "";
});
