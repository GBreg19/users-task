interface userProps {
  name: string;
  email: string;
  city: string;
}

const UserCard = ({ name, email, city }: userProps) => {
  return (
    <>
      <div className="border-2">
        <h1>{name}</h1>
        <p>{email}</p>
        <p>{city}</p>
      </div>
    </>
  );
};

export default UserCard;
