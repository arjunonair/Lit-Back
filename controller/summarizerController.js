const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-text/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '6f74b4a9famsh2bc30b57d838f4dp159c76jsndf329add5491',
    'X-RapidAPI-Host': 'tldrthis.p.rapidapi.com'
  },
  data: {
    text: 'Six years after Yahoo purchased Tumblr for north of $1 billion, its parent corporation is selling the once-dominant blogging platform. WordPress owner Automattic Inc. has agreed to take the service off of Verizon’s hands. Terms of the deal are undisclosed, but the number is “nominal,” compared to its original asking price, per an article in The Wall Street Journal.\n\nAxios is reporting that the asking price for the platform is “well below $20 million,” a fraction of a fraction of its 2013 price tag.\n\nOnce the hottest game in town, the intervening half-decade has been tough on Tumblr, as sites like Facebook, Instagram, Reddit and the like have since left the platform in the dust. More recently, a decision to ban porn from the platform has had a marked negative impact on the service’s traffic. According to Sensor Tower, first-time users for Tumblr’s mobile app declined 33% year-over-year last quarter.\n\n“Tumblr is one of the Web’s most iconic brands,” Automattic CEO Matt Mullenweg said of the news. “It is an essential venue to share new ideas, cultures and experiences, helping millions create and build communities around their shared interests. We are excited to add it to our lineup, which already includes WordPress.com, WooCommerce, Jetpack, Simplenote, Longreads, and more.”\n\nThe news certainly isn’t surprising. In May, it was reported that Verizon was looking for a new owner for the site it inherited through its acquisition of Yahoo. Tumblr was Yahoo’s largest acquisition at the time, as then-CEO Marissa Mayer “promise[d] not to screw it up” in a statement made at the time.\n\nTumblr proved not to be a great fit for Yahoo — and even less so Verizon, which rolled the platform into its short-lived Oath business and later the Verizon Media Group (also TechCrunch’s umbrella company). On the face of it, at least, Automattic seems a much better match. The company runs WordPress.com, one of the internet’s most popular publishing tools, along with Jetpack and Simplenote. As part of the deal, the company will take on 200 Tumblr staffers.\n\n“We couldn’t be more excited to be joining a team that has a similar mission. Many of you know WordPress.com, Automattic’s flagship product. WordPress.com and Tumblr were both early pioneers among blogging platforms,” Tumblr fittingly wrote in a blog post. “Automattic shares our vision to build passionate communities around shared interests and to democratize publishing so that anyone with a story can tell it, especially when they come from under-heard voices and marginalized communities.”\n\n“Today’s announcement is the culmination of a thoughtful, thorough and strategic process,” Verizon Media CEO Guru Gowrappan said in a statement. “Tumblr is a marquee brand that has started movements, allowed for true identities to blossom and become home to many creative communities and fandoms. We are proud of what the team has accomplished and are happy to have found the perfect partner in Automattic, whose expertise and track record will unlock new and exciting possibilities for Tumblr and its users.',
    min_length: 100,
    max_length: 300
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}