class Controller {
  /**
   @param { String } endpoint
   @returns { Promise<{} | null> }
  **/
  async getRequestHandler(endpoint) {
    try {
      const data = await fetch(endpoint);
      const json = data.json();

      return json;

    } catch (err) {
      console.error(err);

      return null;
    }
  }
}

export default Controller;