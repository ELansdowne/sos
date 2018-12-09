import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";
import Task from "../../components/team/task/task";
import axios from "axios";
import { TaskStatus } from "../../shared/model/task-status";

const style = {
  padding: "0.2rem 0.2rem",
  cursor: "move"
};

class Card extends Component {
  render() {
    const {
      card,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div style={{ ...style, opacity }}>
          <Task task={card} />
        </div>
      )
    );
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      card: props.card
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    let status = "Backlog";
    //  drop location
    if (dropResult.listId === 1) {
      status = TaskStatus.BACKLOG;
    } else if (dropResult.listId === 2) {
      status = TaskStatus.INPROGRESS;
    } else if (dropResult.listId === 3) {
      status = TaskStatus.DONE;
    }

    axios
      .put("http://localhost:3000/add-task/" + item.card.id, {
        id: item.card.id,
        teamId: item.card.teamId,
        taskId: item.card.taskId,
        type: item.card.type,
        subType: item.card.subType,
        owner: item.card.owner,
        description: item.card.description,
        sprint: item.card.sprint,
        release: item.card.release,
        status: status
      })
      .then(response => {
        // window.location.reload();
      })
      .catch(error => {
        axios
          .put("http://localhost:3000/tasks/" + item.card.id, {
            id: item.card.id,
            teamId: item.card.teamId,
            taskId: item.card.taskId,
            type: item.card.type,
            subType: item.card.subType,
            owner: item.card.owner,
            description: item.card.description,
            sprint: item.card.sprint,
            release: item.card.release,
            status: status
          })
          .then(response => {
            // window.location.reload();
          });
      });
    //  this.props.close();

    if (dropResult && dropResult.listId !== item.listId) {
      props.removeCard(item.index);
    }
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    if (props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  }
};

export default flow(
  DropTarget("CARD", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("CARD", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Card);
