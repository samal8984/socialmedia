import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

const ProtectedRoute = ({  component: Component, ...rest }) => {
    const alert= useAlert();

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/register' />
                            alert.show(
                                {
                                  actionText: "Login",
                                  content:
                                    "Please Login or Register",
                                  title: "Please Register to access users",
                                },
                            )
                        
                        
                        }

                        

                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute