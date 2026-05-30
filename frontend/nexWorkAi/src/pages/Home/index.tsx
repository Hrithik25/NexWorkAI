import { useAppSelector } from '../../store/hooks';

const Home = () => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  return (
    <div>
      <h1 style={{ color: 'black' }}>Welcome to NexWorkAI</h1>
      <h1
        style={{ color: 'black' }}
      >{`Id: ${user?.id}  Name: ${user?.name}  Email: ${user?.email} Token: ${token}`}</h1>
    </div>
  );
};

export default Home;
