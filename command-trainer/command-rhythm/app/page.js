import KeyRecorder from './key-recorder';
import LikeButton from './like-button';
 
function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}
 
export default function Homeage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'kjsksid'];
 
 
  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
 
      <LikeButton />

      <KeyRecorder />
    </div>
  );
}