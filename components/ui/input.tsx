import * as React from "react"

import {cn} from "@/lib/utils"

import {IoIosEye} from "react-icons/io";
import {IoIosEyeOff} from "react-icons/io";

interface InputProps extends React.ComponentProps<"input"> {
    iconLeft?: React.ReactNode;
    passwordEye?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({iconLeft, passwordEye, className, type, ...props}, ref) => {
        const [passwordEyeToggle, setPasswordEyeToggle] = React.useState(passwordEye);
        return (
            <div className="relative flex items-center">
                {iconLeft && (
                    <div className="absolute left-3 flex items-center text-muted-foreground">
                        {iconLeft}
                    </div>
                )}
                <input
                    type={passwordEyeToggle == null || passwordEyeToggle ? type : "text"}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        iconLeft && "pl-10",

                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {passwordEyeToggle != null && (
                    <div className="absolute right-3 flex items-center text-muted-foreground hover:cursor-pointer">
                        {passwordEyeToggle ?
                            <IoIosEyeOff size={21} onClick={() => setPasswordEyeToggle(false)}/> :
                            <IoIosEye size={21} onClick={() => setPasswordEyeToggle(true)}/>
                        }
                    </div>
                )}
            </div>

        )
    }
)
Input.displayName = "Input"

export {Input}

