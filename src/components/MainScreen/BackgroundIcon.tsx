const BackgroundIcon: React.FC<{
  src: string;
  alt: string;
  className: string;
}> = ({ src, alt, className }) => (
  <img src={src} className={`icon ${className}`} alt={alt} />
);

export default BackgroundIcon;
