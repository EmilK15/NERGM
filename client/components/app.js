import React from 'react';
import { Main } from './containers/';
import { render } from 'react-dom';
import '../../public/stylesheets/styles.scss';
import { BrowserRouter as Router} from 'react-router-dom';

render((<Router>
        <Main />
    </Router>),
    document.getElementById('root'));