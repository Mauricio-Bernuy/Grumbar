import React, { useState, useContext, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { fabric } from 'fabric';
import { FabricContext } from '../context/FabricContext';
import { useAuth0 } from '@auth0/auth0-react';


// let fetchData = []
export default function TitlebarImageList(props) {
  const { user, isLoading, isAuthenticated } = useAuth0();

  const [open, setOpen] = React.useState(false);
  const [fetchData, setFetchData] = React.useState([]);

  const handleClick = () => {
    // console.log(fetchData)
    setOpen(!open);
  };

  // FABRIC ASSET PART

  const { canvas, activeObject, prevGrid, layerLevel } = useContext(
    FabricContext
  );

  useEffect(() => {
    if (isAuthenticated){

      if (props.type==="userAssets"){
        // const userC =  user.email
        // console.log(userC)
        const formData = new FormData();
        formData.append('userId', user.email);
        console.log(formData)
        
        fetch('http://localhost:9000/api/assets/personal', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(json => setFetchData(json))  
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            // console.log(error)
            console.error(error);
          });

        // const formData = new FormData();
        // // // formData.append('userId', user.email);
        // formData.append('userId', 'test');

        // console.log(formData)

        // fetch('http://localhost:9000/api/assets/personal',{
        //   method:'POST',
        //   body: formData
        // })
        // .then(response => response.json())
        // .then(json => setFetchData(json))  
        // .then(result => {
        //   console.log(result);
        // })
        // .catch(error => {
        //   // console.log(error)
        //   console.error(error);
        // })
          

        // .then((response) => response.json())
        // .then(result => fetchData = result)
        

        // console.log(fetchData)
      }
      else{
        fetch('http://localhost:9000/api/assets')
        .then((response) => response.json())
        .then(json => setFetchData(json))
      }
    }
    // console.log(fetchData)
  }, []);

  let lock = false;
  const addAsset = e => {
    canvas.on('mouse:up', function(opt) {
      const file = e.url;
      fabric.Image.fromURL(file, function(img) {
        img.scaleToWidth(100);
        img.snapAngle = 15;
        let pointer = canvas.getPointer(opt.e);
        img.top = pointer.y - img.getScaledHeight() / 2;
        img.left = pointer.x - img.getScaledWidth() / 2;
        console.log('pointer: ', pointer);
        canvas.add(img);
      });
      let listener = canvas.__eventListeners['mouse:up'];
      let curr = listener[listener.length - 1];

      canvas.off('mouse:up', curr);

      lock = false;
    });
  };

  const clickOnce = e => {
    console.log(e)
    if (lock === false) {
      addAsset(e);
      lock = true;
    } else console.log('Button already pressed.');
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open}>
        <ImageList>
          {fetchData.map(item => (
            <ImageListItem key={item.url}>
              <img
                src={`${item.url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading='lazy'
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.category}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                    onClick={() => {
                      clickOnce(item);
                      console.log('adding asset', item.title);
                      props.setAssetOpen(false);
                    }}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Collapse>
    </>
  );
}



const assetData = [
  {
    img: 'http://localhost:9000/api/assets/asset-1656572208831',
    title: 'Firepit',
    Category: 'Common asset'
  },
  {
    img: 'https://i.imgur.com/orMO724.png',
    title: 'Gemstone',
    Category: 'Common asset'
  },
  {
    img: 'https://i.imgur.com/2kSwQon.png',
    title: 'Sword',
    Category: 'Common asset'
  },
  {
    img: 'https://i.imgur.com/EvSVaze.png',
    title: 'Minecart',
    Category: 'Common asset'
  },

  {
    img: 'https://i.imgur.com/tMlDlDM.png',
    title: 'Chair',
    Category: 'Common asset'
  },
  {
    img: 'https://i.imgur.com/0qx8NTi.png',
    title: 'Chest',
    Category: 'Common asset'
  },
  {
    img: 'https://i.imgur.com/PdQYiLw.png',
    title: 'Open Chest',
    Category: 'Common asset'
  },
  {
    img: 'https://i.imgur.com/PNQkU7G.png',
    title: 'Loot Chest',
    Category: '@bkristastucchio'
  }
];

// const assetData = [
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//     Category: "@bkristastucchio",
//     rows: 2,
//     cols: 2,
//
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//     Category: "@rollelflex_graphy726",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//     Category: "@helloimnik",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//     Category: "@nolanissac",
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//     Category: "@hjrc33",
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//     Category: "@arwinneil",
//     rows: 2,
//     cols: 2,
//
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//     Category: "@tjdragotta",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//     Category: "@katie_wasserman",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//     Category: "@silverdalex",
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//     Category: "@shelleypauls",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//     Category: "@peterlaster",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//     Category: "@southside_customs",
//     cols: 2,
//   },
// ];
