body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #333;
}

form {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

label {
    font-weight: bold;
}

input[type="text"] {
    flex: 1;
    margin-right: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
}

button:hover {
    background-color: #0056b3;
}

.topic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.topic-item.completed {
    background-color: #d4edda;
    border-color: #c3e6cb;
}

.topic-item label {
    margin-left: 10px;
}

.topic-item.completed label {
    text-decoration: line-through;
    color: #28a745;
}

span.count {
    font-weight: bold;
    color: #ff6347;
}

.delete-button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
}

.delete-button:hover {
    background-color: #c82333;
}
