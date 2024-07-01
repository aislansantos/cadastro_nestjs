export const mailerUser = {
	subject: "Recuperação de senha.",
	to: "juca@gmail.com",
	template: "forget",
	context: {
		name: "Juca Kifuri",
		token: expect.any(String) // Check for any string token value
	}
};
