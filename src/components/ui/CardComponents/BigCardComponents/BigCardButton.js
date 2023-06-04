import { PropTypes } from "prop-types";

function BigCardButton({ name }) {
  return (
    <div className="h-min mt-2 xl:mt-8 ">
      <button
        onClick={() =>
          window.open(`https://www.pokemon.com/us/pokedex/${name}`, "_blank")
        }
        className="capitalize rounded-3xl p-2 text-sm xl:text-md bg-blueTheme text-yellowTheme shadow-2xl cursor-pointer hover:bg-red-500 xl:w-full"
        style={{ width: "220px", height: "55px" }}
      >
        Visit {name}'s official Nintendo page!
      </button>
    </div>
  );
}

BigCardButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BigCardButton;
