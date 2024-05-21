import React, { useEffect } from "react";
import { actFetchProductsRequest, AddCart } from "../stores/actions";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Product = () => {
  const dispatch = useDispatch();
  const getAllProducts = useSelector((state) => state.Products._products);

  const calculatePercentageValue = (part, whole) => {
    return whole - (whole / 100) * part;
  };
  useEffect(() => {
    if (getAllProducts.length === 0) {
      (async () => {
        await fetch("https://dummyjson.com/products")
          .then((resp) => resp.json())
          .then((response) =>
            dispatch(actFetchProductsRequest(response.products))
          )
          .catch((err) => console.log(err));
      })();
    }
  }, []);
  const Carts = useSelector((state) => state.Products.Carts);
  const classes = useStyles();
  if (getAllProducts.length > 0) {
    return (
      <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Add To Cart</TableCell>
              </TableRow>
            </TableHead>
            {getAllProducts.map((item, index) => (
              <TableBody>
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img src={item.thumbnail} width="100" height="100" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    ₹
                    {calculatePercentageValue(
                      item.discountPercentage,
                      item.price
                    )}
                    <strike style={{ marginLeft: "10px" }}>
                      ₹{item.price}
                    </strike>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Carts.length > 0 ? (
                      item.is_product_has_cart == false ? (
                        <Link to="/carts">
                          <AddShoppingCartRoundedIcon
                            onClick={() => {
                              item["is_product_has_cart"] = true;
                              dispatch(AddCart(item));
                            }}
                          />
                        </Link>
                      ) : (
                        Carts.map((itemCart) => {
                          if (
                            itemCart.id == item.id &&
                            itemCart.is_product_has_cart == true
                          ) {
                            return (
                              <Button
                                variant="contained"
                                color="secondary"
                                disabled
                              >
                                already added in cart
                              </Button>
                            );
                          }
                        })
                      )
                    ) : (
                      <Link to="/carts">
                        <AddShoppingCartRoundedIcon
                          onClick={() => {
                            item["is_product_has_cart"] = true;
                            dispatch(AddCart(item));
                          }}
                        />
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      </>
    );
  }
  return (
    <>
      <CircularProgress />
    </>
  );
};
export default Product;
