import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import routes from './routers';
import DefaultLayout from './layouts';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    let Layout = DefaultLayout;
                    const Page = route.component;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                            key={index}
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
