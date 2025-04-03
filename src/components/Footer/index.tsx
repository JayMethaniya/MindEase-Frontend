import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Youtube } from 'lucide-react';
import logo from '../../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#A7D7C5] to-[#6AA889] py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 space-x-6 md:space-y-0">
        
        {/* Left Section - Logo & Description */}
        <div className="w-full md:w-1/4">
          <img src={logo} alt="logo" className='w-[200px] h-full object-contain' />
          <p className="text-sm font-semibold text-[#445252] mt-2">
            Your mental well-being matters. At MindEase, we are committed to providing compassionate 
            support, guidance, and care to help you navigate life’s challenges. 
          </p>
        </div>

        {/* Services */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg text-[#1e3245] font-bold mb-2">Services</h3>
          <ul className="text-sm text-[#1E3A3A] font-semibold space-y-1">
            <li>Psychotherapy</li>
            <li>Mental Counseling</li>
            <li>Support Groups</li>
            <li>Case Management</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold text-[#1e3245] mb-2">Contact</h3>
          <p className="text-sm flex text-[#1E3A3A] items-center gap-2">📞 +14 5464 8272</p>
          <p className="text-sm flex text-[#1E3A3A] items-center gap-2">✉️ rona@domain.com</p>
          <p className="text-sm flex text-[#1E3A3A] items-center gap-2">📍 Lazy Tower 192, Burn Swiss</p>
        </div>

        {/* Links */}
        <div className="w-full md:w-1/6">
          <h3 className="text-lg font-bold text-[#1e3245] mb-2">Links</h3>
          <ul className="text-sm text-[#1E3A3A] font-semibold space-y-1">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>

        {/* Maps Placeholder */}
        <div className="w-full md:w-1/6">
          <h3 className="text-lg font-bold text-[#1e3245]mb-2">Maps</h3>
          <div className="w-20 h-20 bg-gray-300"></div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-[#1e3245] opacity-50 my-6"></div>

      {/* Social Media & Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex font-bold text-[#1e3245] space-x-4">
          <Instagram />
          <Facebook />
          <Twitter />
          <Youtube />
          <LinkedIn />
        </div>
        <p className="text-sm font-bold text-[#1e3245] mt-4 md:mt-0">&copy; 2025 @mindease all rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
