import React from "react";
import { connect } from "react-redux";
import {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
  GetAllProduct,
} from "../stores/actions";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function Cart({ items, IncreaseQuantity, DecreaseQuantity, DeleteCart }) {
  const classes = useStyles();
  let ListCart = [];
  let TotalCart = 0;

  const calculatePercentageValue = (part, whole) => {
    return whole - (whole / 100) * part;
  };

  Object.keys(items.Carts).forEach(function (item) {
    const actualPrice = calculatePercentageValue(
      items.Carts[item].discountPercentage,
      items.Carts[item].price
    );
    TotalCart += items.Carts[item].stock * actualPrice;
    ListCart.push(items.Carts[item]);
  });

  const TotalPrice = (price, qty, discountPercentage) => {
    const actualPrice = calculatePercentageValue(discountPercentage, price);
    return Number(actualPrice * qty);
  };

  const dispatch = useDispatch();
  // const Carts = useSelector((state) => state.Products.Carts);
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product name</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Total Price</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          {ListCart.length > 0 ? (
            ListCart.map((item, key) => {
              return (
                <TableBody>
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">
                      {item.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <img
                        src={item.thumbnail}
                        style={{ width: "100px", height: "80px" }}
                      />
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
                      <span
                        className="btn btn-primary"
                        style={{ margin: "2px" }}
                        onClick={() => DecreaseQuantity(key)}
                      >
                        -
                      </span>
                      <span className="btn btn-info">{item.stock}</span>
                      <span
                        className="btn btn-primary"
                        style={{ margin: "2px" }}
                        onClick={() => IncreaseQuantity(key)}
                      >
                        +
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      ₹
                      {TotalPrice(
                        item.price,
                        item.stock,
                        item.discountPercentage
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <HighlightOffOutlinedIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          item["is_product_has_cart"] = false;
                          dispatch(GetAllProduct(item));
                          DeleteCart(key);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })
          ) : (
            <caption style={{ textAlign: "center" }}>
              <ShoppingCartOutlinedIcon
                style={{ fontSize: 50, margin: "20px" }}
              />
              <br />
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary">
                  Go to Products
                </Button>
              </Link>
            </caption>
          )}
        </Table>
        <Box m={3} style={{ display: "flex", justifyContent: "flex-end" }}>
          <strong>Total Cart Price:- ₹{Number(TotalCart)}</strong>
        </Box>
      </TableContainer>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    items: state.Products,
  };
};

export default connect(mapStateToProps, {
  IncreaseQuantity,
  DecreaseQuantity,
  DeleteCart,
})(Cart);
