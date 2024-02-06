import { BiLogoAmazon } from "react-icons/bi";
import { ToggleButton } from "./ToggleButtun";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { Session } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  // const user = new Session()

  return (
    <div className="w-full p-4">
      <div className="flex flex-row items-center gap-3">
        <BiLogoAmazon size={40} />
        <div className="flex-1 flex items-center justify-end gap-3">
          <ToggleButton />
          <Button className="font-bold">
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
          <UserButton />
        </div>
      </div>
      {/* logo */}
    </div>
  );
};

export default Navbar;
