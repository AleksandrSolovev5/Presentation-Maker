import "./PresentationTitle.css";

type PresentationTitleProps = {
  title: string;
};

function PresentationTitle({ title }: PresentationTitleProps) {
  return (
    <div className="presentation-title-container">
      <input
        className="presentation-title-input"
        value={title}
        readOnly
      />
    </div>
  );
}

export default PresentationTitle;

