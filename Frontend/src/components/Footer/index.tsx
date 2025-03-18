import { Color } from '../../util/color';

const Footer: React.FC = () => {
  return (
    <footer 
      className={`bg-[${Color.lightGreen}]  text-gray-800 p-4 text-center`}
    >
      <p>&copy; 2025 MindEase. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
