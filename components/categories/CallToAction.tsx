import { Button } from "@/components/ui/button";

interface CallToActionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
}

export function CallToAction({
    title,
    description,
    buttonText,
    buttonHref
}: CallToActionProps) {
    return (
        <div className="bg-white text-gray-900 py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-900">{description}</p>
                <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100"
                    onClick={() => window.location.href = buttonHref}
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}