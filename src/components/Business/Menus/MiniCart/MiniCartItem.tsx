import { useQuery } from "@apollo/client";
import { FETCH_PRODUCT_INFO_BY_ID } from "apollo/queries/storeAPI";
import { Button } from "components/UI/Button/Button";
import { useGetPriceById } from "hooks/apollo/useGetPriceById";
import { useAppDispatch } from "hooks/redux";
import { MiniCartItems } from "interface/IMiniCartMenu";
import { IProduct } from "interface/IStore";
import { decreaseAmount, increaseAmount } from "store/slices/cart";

export const MiniCartItem: React.FC<MiniCartItems> = ({ id, selectedAttributes, amount }) => {
  const dispatch = useAppDispatch();

  const { data } = useQuery(FETCH_PRODUCT_INFO_BY_ID, {
    variables: {
      id: id,
    },
  });

  const productInfo: IProduct = data?.product;
  const attributes = productInfo?.attributes;
  const { price, currency } = useGetPriceById(id);

  console.log(selectedAttributes);

  const handleQtyPlusClick = () => {
    dispatch(increaseAmount(id + JSON.stringify(selectedAttributes)));
  };

  const handleQtyMinusClick = () => {
    dispatch(decreaseAmount(id + JSON.stringify(selectedAttributes)));
  };

  return (
    <div className="cart-menu-card">
      <div className="cart-menu-card-info">
        <div className="cart-menu-card-name">
          {productInfo?.brand} {productInfo?.name}
        </div>
        <div className="cart-menu-card-price">
          <span>
            {currency} {price}
          </span>
        </div>
        {attributes?.map((attribute) => (
          <div key={attribute.id} className="cart-menu-card-setting">
            {attribute?.name}
            <div className="cart-menu-card-setting-buttons">
              {attribute?.type === "text" &&
                attribute?.items.map((el) => (
                  <Button
                    key={el.id}
                    size="sm"
                    type="outline"
                    className="mg-r-sm"
                    color={selectedAttributes[attribute.name] === el.value ? "black" : ""}
                  >
                    {el.displayValue}
                  </Button>
                ))}

              {attribute?.type === "swatch" &&
                attribute?.items.map((el) => (
                  <Button
                    key={el.id}
                    size="xs"
                    type="color"
                    bgcolor={el.value}
                    className="mg-r-sm"
                    selected={selectedAttributes[attribute.name] === el.value}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-menu-qty-controls">
        <Button
          size="xs"
          type="outline"
          onClick={() => {
            handleQtyPlusClick();
          }}
        >
          +
        </Button>
        <div className="cart-menu-qty-controls-qty">{amount}</div>
        <Button
          size="xs"
          type="outline"
          onClick={() => {
            handleQtyMinusClick();
          }}
        >
          -
        </Button>
      </div>
      <div className="cart-menu-card-image">
        <img src={productInfo?.gallery[0]} alt={productInfo?.name} />
      </div>
    </div>
  );
};