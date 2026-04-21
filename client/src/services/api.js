const BASE_URL = "http://localhost:5000/api";

export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}

export async function getHabits() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/habits", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch habits");
  }

  return data;
}

export async function addHabit(name) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/habits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: name }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add habit");
  }

  return data;
}

export async function completeHabit(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/habits/complete/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to complete habit");
  }

  return data;
}

export async function deleteHabit(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/habits/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete habit");
  }

  return data;
}

export async function getAnalytics() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/habits/analytics",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch analytics");
  }

  return data;
}