export function responsiveSize({ min, max, min_device_width, max_device_width }) {
  return `calc(${min} + (${parseInt(max)} - ${parseInt(min)}) * ((100vw - ${min_device_width}) / (${parseInt(max_device_width)} - ${parseInt(min_device_width)})))`;
}

export default {
  responsiveSize
}