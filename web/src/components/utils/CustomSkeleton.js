import React from "react";
import { connect } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

function CustomSkeleton({ width, height, count, circle }) {

  const theme = useTheme();
  return (
    <SkeletonTheme
      color={theme.palette.type==="dark" ? grey[300] : ""}
      highlightColor={theme.palette.type==="dark" ? grey[200]  : ""}
    >
      <Skeleton width={width} height={height} count={count} circle={circle} />
    </SkeletonTheme>
  );
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(CustomSkeleton);
