type Props = {
    data: Record<string, never>;
};

const JsonLd: React.FC<Props> = ({data}) => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
        />
    );
}

export default JsonLd;