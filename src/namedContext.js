import React from 'react'
import { resolveContext, createNamedContext, removeNamedContext } from './context'

export default function namedContext(contextName, initialState) {
    return Wrapped =>
        class extends React.PureComponent {
            constructor(props) {
                super()
                this.name = resolveContext(contextName, props)
                this.state = { context: createNamedContext(this.name, initialState) }
            }
            componentWillUnmount() {
                removeNamedContext(this.name)
            }
            render() {
                return <Wrapped {...this.props} context={this.state.context} />
            }
        }
}