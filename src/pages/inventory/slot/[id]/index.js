import { useEffect, useState} from 'react';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import { Box, Breadcrumbs, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { BasicSearchbar } from 'src/components/basic-searchbar';
import { NewLayout } from 'src/components/new-layout';
import { CollectionCard } from 'src/components/inventory/CollectionCard';
import axios from 'axios';
import React from 'react';
import { sortCollections, collectionSortMethods } from 'src/pages/explorer/slot/[id]/index';

const slotButtonStyle = { color: 'blue', border: '1px solid blue', fontSize: '1vw' };
const emptyNode = <></>;

const InventorySlotPage = ()=>{
  const router = useRouter();
  const [thisLink, setThisLink] = useState("");
  const [app, setApp] = useState(null);
  const [collections, setCollections] = useState(null);
  const [chosenSlot, setChosenSlot] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("maximum");
  const [totalNfts, setTotalNfts] = useState(0);
  const [collectionCounts, setCollectionCounts] = useState({});
  const [activeCollections, setActiveCollections] = useState(null);
  
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSelect = (e) => {
    setSort(e.target.value);
  }

  useEffect(() => {
    if (router.isReady) {
      setThisLink(router.query.id.replace("/explorer/slot/",""));
    }
  }, [router.isReady]);

  useEffect(() => {
    if (thisLink) {
      getSlot(thisLink)
        .then((slot) => {
          setChosenSlot(slot);
        })
        .catch((e) => {
          console.log('setting error: ', e.message);
        });
    }
  }, [thisLink]);

  useEffect(() => {
    if (chosenSlot) {
      getActiveCollections(thisLink)
        .then((collections) => {
          setActiveCollections(collections);
        })
        .catch((e) => {
          console.log('setting error: ', e.message);
        });
    }
  }, [chosenSlot])

  useEffect(() => {
    if (activeCollections) {
      getCollections(activeCollections)
        .then((collections) => {
          setCollections(collections);
        })
        .catch((e) => {
          console.log('setting error: ', e.message);
        });
    }
  }, [activeCollections]);

  useEffect(() => {
    if (collections) {
      sortCollections(collections, sort)
        .then((newCollections) => {
          setCollections(newCollections);
        })
        .catch((e) => {
          console.log('setting error: ', e.message);
        });
    }
  }, [sort]);

  useEffect(() => {
    getApp()
      .then((app) => {
        setApp(app);
      })
      .catch((e) => {
        console.log('setting error: ', e.message);
      });
  }, []);

  useEffect(() => {
    countNfts(activeCollections)
      .then((count) => {
        setTotalNfts(count);
      })
      .catch(e => { console.log('setting error: ', e.message) });
  }, [activeCollections]);

  /*useEffect(() => {
    getNftCounts(collections).then((counts) => {
      setCollectionCounts(counts)
    })
      .catch(e => { console.log('setting error: ', e.message) });
  }, [collections]);*/

  if (!(app && chosenSlot && collections && collectionCounts)) return emptyNode;

  const sharedSx = { font: 'nunito', lineHeight: '40px', fontSize: { xs: '12px', sm: '12px', md: '14px', lg: '16px', xl: '18px' }};
  const sharedSxBold = { fontWeight: 'bold', font: 'nunito', lineHeight: '40px', fontSize: { xs: '12px', sm: '12px', md: '14px', lg: '16px', xl: '18px' }};

  return (
    <Box sx={{ backgroundColor: 'none', py: 5 }}>
      <Box sx={{
        width: '95%',
        alignSelf: 'stretch',
        marginLeft: "auto",
        marginRight: "auto",
        py: 1,
        px: 5,
        backgroundColor: 'none'
      }}>
        <Grid container spacing={2}>
          <Grid item>
            <Breadcrumbs aria-label="breadcrumb">
              <NextLink underline="hover" color="inherit" href="/inventory">
                App
              </NextLink>
              <Typography color="text.primary">
                Slot
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} sx={{ backgroundColor: "none" }}>
            <Typography variant="p2" sx={sharedSxBold}>
              App:&nbsp;
            </Typography>
            <Typography variant="p2" sx={sharedSx}>
              {app.appName} &emsp;
            </Typography>
            <Typography variant="p2" sx={sharedSxBold}>
              Slot:&nbsp;
            </Typography>
            <Typography variant="p2" sx={sharedSx}>
              { chosenSlot.slotName }
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ backgroundColor: "none" }}>
            <Typography variant="p2" sx={sharedSxBold}>
              Total Collections:&nbsp;
            </Typography>
            <Typography variant="p2" sx={sharedSx}>
              {chosenSlot.collections.length} &emsp;
            </Typography>
            <Typography variant="p2" sx={sharedSxBold}>
              Total NFTs Owned:&nbsp;
            </Typography>
            <Typography variant="p2" sx={sharedSx}>
              { totalNfts }
              <br></br>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ backgroundColor: "none" }}>
            <Box sx={{ left: 0, width: "100%" }}>
              <BasicSearchbar onChange={handleSearch} sx={{ left: 0, width: "80%", p: 1 }}/>
              <FormControl sx={{ width: "20%", right: 0, p: 1 }}>
                <InputLabel id="demo-simple-select-label">
                  Sort
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Sort"
                  onChange={handleSelect}
                >
                  <MenuItem value={"maximum"}>Maximum: High to Low</MenuItem>
                  <MenuItem value={"maximumReverse"}>Maximum: Low to High</MenuItem>
                  <MenuItem value={"minted"}>Minted: High to Low</MenuItem>
                  <MenuItem value={"mintedReverse"}>Minted: Low to High</MenuItem>
                  <MenuItem value={"newest"}>Newest</MenuItem>
                  <MenuItem value={"oldest"}>Oldest</MenuItem>
                  <MenuItem value={"aToZ"}>Alphabetical</MenuItem>
                  <MenuItem value={"zToA"}>Reverse Alphabetical</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} sx={{ p: 1 }}>
              { collections.map((collection) => (
                <React.Fragment key={collection.collectionId}>
                  <CollectionCard search={search} collection={collection} slot={chosenSlot} collectionCount={activeCollections[collection.collectionId]}/>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

InventorySlotPage.getLayout = (page) => (
  <NewLayout>
    { page }
  </NewLayout>
);

const countNfts = async (collectionCounts) => {
  let nftCount = 0;
  for (const key in collectionCounts) {
    if (collectionCounts.hasOwnProperty(key)) {
      nftCount += collectionCounts[key];
    }
  }
  return nftCount;
}
  
/*const getNftCounts = async (collections) => {
  var nftCounts = {};
  if (collections){
    for (const element of collections) {
      var nftCount = await axios.post('/api/nft/collections', { collectionIds:[element.collectionId], countsOnly: true });
      if(nftCount){
        nftCounts[element.collectionId] = nftCount.data.collections[element.collectionId];
      }
    }
    console.log(nftCounts);
    return nftCounts;
  }
}*/
  
const getApp = async () => {
  const appObject = (await axios.post('/api/app/info', { }));
  return appObject.data.app;
}

const getSlot = async (slotId)=>{ // just used for testing
  const slotsObject = (await axios.post('/api/slot/info', { slotId: slotId }));
  return slotsObject.data.slot;
}
  
const getCollections = async (activeCollections) => {
  if (activeCollections) {
    const collections = Object.keys(activeCollections);
    const collectionsObject = (await axios.post('/api/collection/info', { collectionIds:collections, idOnly: false, includeDeactivated: false }));
    return collectionsObject.data.collections.sort(collectionSortMethods.maximum);
  }
}

const getActiveCollections = async (slot) => {
  if (slot) {
    const activeCollectionsObject = await axios.post('/api/nft/slots', { slotIds:[slot], countsOnly: true });
    //console.log(Object.keys(activeCollectionsObject.data.nfts));
    return activeCollectionsObject.data.nfts;
  }
}

export default InventorySlotPage;