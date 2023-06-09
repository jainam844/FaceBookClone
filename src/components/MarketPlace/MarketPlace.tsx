import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SellingItem from "./marketdata";
const MarketPlace = () => {
  const sellingItems = [
    {
      img: "https://source.unsplash.com/GRV4ypBKgxE",
      price: "₹340,969",
      description: "Audi S5 Sunset",
      location: "Berlin, Germany",
    },

    {
      img: "https://source.unsplash.com/ZwKCWVFdrcs",
      price: "₹1,35,000",
      description: "iPhone 11 Pro Max in spacegray",
      location: "Paris, France",
    },
    {
      img: "https://source.unsplash.com/hGV2TfOh0ns",
      price: "₹40,000",
      description: "Apple Laptop",
      location: "Tokyo, Japan",
    },
    {
      img: "https://source.unsplash.com/hbTKIbuMmBI",
      price: "₹8,399",
      description: "Apple Watch Series 5",
      location: "Ottawa, Canada",
    },
    {
      img: "https://source.unsplash.com/SxAXphIPWeg",
      price: "₹1,40,000",
      description: "“Leather on concrete”",
      location: "Amman, Jordan",
    },
    {
      img: "https://source.unsplash.com/_H0fjILH5Vw",
      price: "₹8,40,000",
      description: "navy blue backpack",
      location: "Rome, Italy",
    },
    {
      img: "https://source.unsplash.com/D4tnWO2-rto",
      price: "₹66,959",
      description: "royal enfield",
      location: "	Canberra, Australia",
    },
    {
      img: "https://source.unsplash.com/7sWm1yRJZhg",
      price: "₹70,000",
      description: "Vegan salad bowl",
      location: "Beijing, China",
    },
    {
      img: "https://source.unsplash.com/cz4rC-IRfxw",
      price: "₹70,000",
      description: "Vegan salad bowl",
      location: "Beijing, China",
    },
    {
      img: "https://source.unsplash.com/7ZC4qO3Gj6g",
      price: "₹70,000",
      description: "Vegan salad bowl",
      location: "Beijing, China",
    },
    {
      img: "https://source.unsplash.com/IGfIGP5ONV0",
      price: "₹70,000",
      description: "Vegan salad bowl",
      location: "Beijing, China",
    },
    {
      img: "https://source.unsplash.com/ljRiZl00n18",
      price: "₹70,000",
      description: "Vegan salad bowl",
      location: "Beijing, China",
    },
    {
      img: "https://source.unsplash.com/Nj1R4X4yl_g",
      price: "₹70,000",
      description: "Vegan salad bowl",
      location: "Beijing, China",
    },
    {
      img: "https://source.unsplash.com/WfuIO53oaTA",
      price: "₹70,000",
      description: "Vegan salad bowl",
      location: "Beijing, China",
    },
    {
      img: "https://source.unsplash.com/TJrkkhdB39E",
      price: "₹70,000",
      description: "Vegan salad bowl",
      location: "Beijing, China",
    },
    {
      img: "https://source.unsplash.com/lIgFLLDdqMk",
      price: "₹70,000",
      description: "Vegan salad bowl",
      location: "Beijing, China",
    },
  ];
  return (
    <Box
      sx={
        {
          // width: ['100%', '100%', '75%', '75%'],
          // maxHeight: '100vh'
        }
      }
    >
      <Box sx={{ padding: 3 }}>
        <Typography
          sx={{
            margin: "1.5rem 1.5rem 0 1.3rem",
            fontSize: "22px",
            fontWeight: " bold",
          }}
        >
          Today's picks
        </Typography>

        <Grid xs={12} sx={{ margin: "10px 0" }}>
          <Grid container justifyContent="start" spacing={2}>
            {sellingItems.map((item, index) => (
              <SellingItem
                key={index}
                img={item.img}
                price={item.price}
                description={item.description}
                location={item.location}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MarketPlace;
