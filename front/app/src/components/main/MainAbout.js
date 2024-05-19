import { observer } from 'mobx-react-lite';
import React from 'react';
import { Fade } from 'react-bootstrap';

const MainAbout = observer(() => {
    return(
        <><Fade in={true} timeout={2000} delay={1000}>
        <div>
        <h2>Миссия: Подчеркнуть ваш</h2>
        <h2>очаровывающий образ</h2>
        </div>
      </Fade>
      </>
    )
});

export default MainAbout;
