const date = new Date();
const dateOptions = { weekday: `long`, year: `numeric`, month: `long`, day: `numeric` };

const TopNavigation = ({ name, status }) => (
  <header className={`${status ? `bg-green-300` : `bg-pink-300`} p-4`}>
    <p>{`name: ${name}`}</p>
    <p>{`status: ${status ? `active` : `inactive`}`}</p>
    <p>{`date: ${date.toLocaleDateString(`pl-PL`, dateOptions)}`}</p>
  </header>
);

export default function BaseLayout({ children, name, status }) {
  return (
    <>
      <TopNavigation name={name} status={status} />
      {children}
    </>
  );
}
