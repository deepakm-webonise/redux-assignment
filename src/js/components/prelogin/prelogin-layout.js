export default class Layout extends React.Component {
    render() {
        return [
            <header key={Math.random()}>Header</header>,
                <div key={Math.random()}>
                    {this.props.children}
                </div>,
            <footer key={Math.random()}>Footer</footer>
        ];
    }
}

Layout.propTypes = {
    children: PropTypes.array
}
