    const iframeSpeaker = function (__frame_data__, __frame_id__) {
		let frame_data = new URL(location.href).searchParams.get(__frame_data__);
		let frame_id   = new URL(location.href).searchParams.get(__frame_id__);
		if(frame_data !== null){
			let data = decodeURIComponent(frame_data);
			document.body.insertAdjacentHTML(
				'afterend',
				'<style>'+data+'</style>'
			);
		}
		if(frame_id !== null){
			const getParamsMessage = (clientHeight) => {
				let data = {
					height : clientHeight + "px",
					__frame_id__ : frame_id
				}
				return JSON.stringify(data);
			}
			const sendMessagedata = (clientHeight) => {
				let json_data = getParamsMessage(clientHeight);
				window.parent.postMessage(json_data, '*');
			}
			const outerHeight = function (el) {
				const style = getComputedStyle(el);
				return (
					el.getBoundingClientRect().height +
					parseFloat(style.marginTop) +
					parseFloat(style.marginBottom)
				);
			}
			const resizeObserver = new ResizeObserver((entries) => {
				sendMessagedata(outerHeight(entries[0].target));
			})
			document.addEventListener('DOMContentLoaded', function (event) {
				sendMessagedata(document.body.clientHeight);
			});
			resizeObserver.observe(document.body);
		}
    }
    new iframeSpeaker('__frame_data__','__frame_id__');
