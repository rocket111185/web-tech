const MessageList = ({data}) => {
  return (
    <ul>
      {/*
        data.map є аналогом директиви ng-repeat, оскільки цикл відбувається
        за рахунок ітерації масиву data.
        Створення графічних елементів виконується для кожного елементу масиву.
      */}
      {data.map((message) => (
        <li key={message.id}>
          <strong>{message.author}:</strong> {message.text}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
