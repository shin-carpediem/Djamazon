"use strict";

const demo = () => {
  const e = React.createElement;

  class LikeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = { liked: false };
    }

    render() {
      if (this.state.liked) {
        return "You liked comment number " + this.props.commentID;
      }

      return e(
        "button",
        { onClick: () => this.setState({ liked: true }) },
        "Like"
      );
    }
  }

  // Find all DOM containers, and render Like buttons into them.
  document
    .querySelectorAll(".like_button_container")
    .forEach((domContainer) => {
      // Read the comment ID from a data-* attribute.
      const commentID = parseInt(domContainer.dataset.commentid, 10);
      ReactDOM.render(e(LikeButton, { commentID: commentID }), domContainer);
    });
};
demo();

// {
//   class Square extends React.Component {
//     render() {
//       return <button className="square">{/* TODO */}</button>;
//     }
//   }

//   class Board extends React.Component {
//     renderSquare(i) {
//       return <Square />;
//     }

//     render() {
//       const status = "Next player: X";

//       return (
//         <div>
//           <div className="status">{status}</div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
//   }

//   class Game extends React.Component {
//     render() {
//       return (
//         <div className="game">
//           <div className="game-board">
//             <Board />
//           </div>
//           <div className="game-info">
//             <div>{/* status */}</div>
//             <ol>{/* TODO */}</ol>
//           </div>
//         </div>
//       );
//     }
//   }

//   // ========================================

//   ReactDOM.render(<Game />, document.getElementById("root"));
// }
