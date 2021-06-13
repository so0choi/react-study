import React from "react";

const User = React.memo(function User({ user, onRemove, onToggle }) {
  //   useEffect(() => {
  //     console.log("user 값이 설정됨");
  //     console.log(user);
  //     return () => {
  //       console.log("user가 바뀌기 전..");
  //       console.log(user);
  //     };
  //   }, []);

  /*
    첫번째 파라미터: 함수, 두번째 파라미터: 의존값이 들어있는 배열 deps
    deps가 비어있는 경우 컴포넌트가 처음 나타날 때만 useEffect함수가 호출됨
*/

  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>{" "}
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

export default React.memo(function UserList({ users, onRemove, onToggle }) {
  return (
    <>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </>
  );
});
