import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup} from 'react-bootstrap';
import { Context } from '../index';



const NavigationCat = observer(() => {
  const {product} = useContext(Context)
    return (
        <ListGroup>
          
          {product.categories.map(category => 
            <ListGroup.Item style={{cursor: 'pointer'}} active={category.id === product.selectedCategory.id} key={category.id} onClick={() => product.setSelectedCategory(category)}>
              {category.name}
            </ListGroup.Item>
          )}
        </ListGroup>
      );
});

export default NavigationCat;
