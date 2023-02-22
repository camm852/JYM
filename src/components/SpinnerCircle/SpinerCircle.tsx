import './SpinerCircle.css';

export default function Spiner(): JSX.Element {
  return (
    <div className="spinner">
      <div className="double-bounce1" />
      <div className="double-bounce2" />
    </div>
  );
}
