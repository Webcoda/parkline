import $ from 'jquery'
export default function serializeDataToJson($form) {
	const unindexed_array = $form.serializeArray()
	const indexed_array = {}

	$.map(unindexed_array, function(n, i) {
		indexed_array[n['name']] = n['value']
	})

	return indexed_array
}
