export const PeluqueriaEventBox = ({ event }) => {
  const { title, user, amount } = event;
  return (
    <>
      <strong>
        {title} {amount}
      </strong>
      <span> - {user.name}</span>
    </>
  );
};
